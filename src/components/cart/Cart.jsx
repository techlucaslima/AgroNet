import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  useToast,
} from '@chakra-ui/react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import {
  getCartFromStorage,
  saveCartToStorage,
  updateCartItemQuantity,
  calculateCartTotal,
} from '../../utils/cartUtils';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth();
  const toast = useToast();

  useEffect(() => {
    setCartItems(getCartFromStorage());
  }, []);

  const handleUpdateQuantity = (productId, change) => {
    const updatedCart = updateCartItemQuantity(cartItems, productId, change);
    setCartItems(updatedCart);
  };

  const handleCheckout = async () => {
    try {
      await addDoc(collection(db, 'orders'), {
        userId: currentUser.uid,
        items: cartItems,
        total: calculateCartTotal(cartItems),
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      setCartItems([]);
      saveCartToStorage([]);
      
      toast({
        title: 'Order placed successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to place order',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const total = calculateCartTotal(cartItems);

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        {cartItems.map((item) => (
          <Box key={item.id} p={4} borderWidth={1} borderRadius="lg">
            <HStack spacing={4}>
              <Image
                src={item.imageUrl}
                alt={item.name}
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
              />
              <VStack align="start" flex={1}>
                <Text fontSize="lg" fontWeight="bold">
                  {item.name}
                </Text>
                <Text>R$ {item.price} per {item.unit}</Text>
              </VStack>
              <HStack>
                <Button
                  size="sm"
                  onClick={() => handleUpdateQuantity(item.id, -1)}
                >
                  -
                </Button>
                <Text>{item.quantity}</Text>
                <Button
                  size="sm"
                  onClick={() => handleUpdateQuantity(item.id, 1)}
                >
                  +
                </Button>
              </HStack>
              <Text fontWeight="bold">
                R$ {(item.price * item.quantity).toFixed(2)}
              </Text>
            </HStack>
          </Box>
        ))}
        {cartItems.length > 0 ? (
          <Box p={4} borderWidth={1} borderRadius="lg">
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">
                Total:
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                R$ {total.toFixed(2)}
              </Text>
            </HStack>
            <Button
              colorScheme="blue"
              width="100%"
              mt={4}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Box>
        ) : (
          <Text textAlign="center">Your cart is empty</Text>
        )}
      </VStack>
    </Container>
  );
}