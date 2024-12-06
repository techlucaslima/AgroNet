import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  Select,
} from '@chakra-ui/react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('consumer');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      const { user } = await signup(email, password);
      await setDoc(doc(db, 'users', user.uid), {
        email,
        name,
        userType,
        createdAt: new Date().toISOString(),
      });
      navigate('/');
    } catch (err) {
      setError('Failed to create an account');
    }
  }

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius={8}>
      <VStack spacing={4}>
        <Heading>Sign Up</Heading>
        {error && <Text color="red.500">{error}</Text>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Account Type</FormLabel>
              <Select value={userType} onChange={(e) => setUserType(e.target.value)}>
                <option value="consumer">Consumer</option>
                <option value="farmer">Farmer</option>
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="blue" width="100%">
              Sign Up
            </Button>
          </VStack>
        </form>
        <Text>
          Already have an account?{' '}
          <Link color="blue.500" href="/login">
            Log In
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}