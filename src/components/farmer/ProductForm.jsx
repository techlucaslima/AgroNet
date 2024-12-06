import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../utils/productUtils';
import { useAuth } from '../../contexts/AuthContext';

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    unit: 'kg',
    category: '',
    imageUrl: '',
  });
  
  const { currentUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

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
      };

      await createProduct(productData, currentUser.uid);

      toast({
        title: 'Product added successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/');
    } catch (error) {
      toast({
        title: 'Failed to add product',
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
        <Heading mb={6}>Add New Product</Heading>
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
              Add Product
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}