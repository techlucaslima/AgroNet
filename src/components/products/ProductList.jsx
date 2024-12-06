import { useState, useEffect } from 'react';
import { 
  SimpleGrid, 
  Container, 
  Input, 
  Select, 
  useToast,
  Button,
  Flex,
  Spacer
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { subscribeToProducts, filterProducts } from '../../utils/productUtils';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { getCartFromStorage, saveCartToStorage } from '../../utils/cartUtils';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [userType, setUserType] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = subscribeToProducts((updatedProducts) => {
      setProducts(updatedProducts);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function getUserType() {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserType(userDoc.data().userType);
        }
      }
    }
    getUserType();
  }, [currentUser]);

  const handleAddToCart = (product) => {
    if (!currentUser) {
      toast({
        title: 'Please login first',
        description: 'You need to be logged in to add items to cart',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }

    const cart = getCartFromStorage();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      saveCartToStorage(cart);
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      saveCartToStorage(newCart);
    }

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const filteredProducts = filterProducts(products, searchTerm, category);

  return (
    <Container maxW="container.xl" py={8}>
      <Flex mb={8} gap={4} align="center">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW="300px"
        />
        <Select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          maxW="200px"
        >
          <option value="all">All Categories</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="dairy">Dairy</option>
          <option value="eggs">Eggs</option>
        </Select>
        <Spacer />
        {currentUser && userType === 'farmer' && (
          <Button
            colorScheme="blue"
            onClick={() => navigate('/add-product')}
          >
            Add New Product
          </Button>
        )}
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}