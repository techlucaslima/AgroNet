import { Box, Flex, Button, Text, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const bg = useColorModeValue('white', 'gray.800');

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  return (
    <Box bg={bg} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" as={RouterLink} to="/">
          AgroNet
        </Text>
        <Flex alignItems="center" gap={4}>
          <Button as={RouterLink} to="/" variant="ghost">
            Home
          </Button>
          <Button as={RouterLink} to="/products" variant="ghost">
            Products
          </Button>
          {currentUser ? (
            <>
              <Button as={RouterLink} to="/cart" variant="ghost">
                Cart
              </Button>
              <Button onClick={handleLogout} colorScheme="blue">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/login" variant="ghost">
                Login
              </Button>
              <Button as={RouterLink} to="/signup" colorScheme="blue">
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}