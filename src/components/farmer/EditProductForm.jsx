import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  Textarea,
  useToast,
  Container,
  Heading,
} from '@chakra-ui/react';
import { updateProduct } from '../../utils/productUtils';
import { useAuth } from '../../contexts/AuthContext';

export default function EditProductForm() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    unit: 'kg',
    category: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (state?.product) {
      const { product } = state;
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        category: product.category,
        imageUrl: product.imageUrl,
      });
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseFloat(formData.quantity),
        farmerId: currentUser.uid,
      };

      await updateProduct(id, productData);

      toast({
        title: 'Product updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/');
    } catch (error) {
      toast({
        title: 'Failed to update product',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Box maxW="xl" mx="auto">
        <Heading mb={6}>Edit Product</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Price (R$)</FormLabel>
              <Input
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Quantity</FormLabel>
              <Input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Unit</FormLabel>
              <Select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="unit">Unit</option>
                <option value="dozen">Dozen</option>
                <option value="liter">Liter</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="dairy">Dairy</option>
                <option value="eggs">Eggs</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" width="100%" size="lg">
              Update Product
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}