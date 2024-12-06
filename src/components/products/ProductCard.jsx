import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deleteProduct } from '../../utils/productUtils';

export default function ProductCard({ product, onAddToCart }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const isOwner = currentUser && currentUser.uid === product.farmerId;

  const handleEdit = () => {
    navigate(`/edit-product/${product.id}`, { state: { product } });
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      onClose();
      toast({
        title: 'Product deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting product',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          borderRadius="md"
          objectFit="cover"
          height="200px"
          width="100%"
        />
        <VStack align="start" mt={4} spacing={2}>
          <HStack justify="space-between" width="100%">
            <Text fontSize="xl" fontWeight="semibold">
              {product.name}
            </Text>
            <Badge colorScheme="green">R$ {product.price}</Badge>
          </HStack>
          <Text color="gray.600">{product.description}</Text>
          <Text fontSize="sm">
            Available: {product.quantity} {product.unit}
          </Text>
          <HStack width="100%" justify="space-between">
            {isOwner ? (
              <HStack spacing={2}>
                <IconButton
                  icon={<EditIcon />}
                  colorScheme="yellow"
                  onClick={handleEdit}
                  aria-label="Edit product"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={onOpen}
                  aria-label="Delete product"
                />
              </HStack>
            ) : (
              <Button
                colorScheme="blue"
                width="100%"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </Button>
            )}
          </HStack>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete {product.name}?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}