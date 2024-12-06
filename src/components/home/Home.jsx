import { Box, Container, Heading, Text, SimpleGrid, Image, VStack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="2xl" mb={4}>
            Bem-vindo à AgroNet
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Conectando agricultores locais diretamente aos consumidores
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={12}>
          <Box>
            <Image
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854"
              alt="Fazenda sustentável"
              borderRadius="lg"
              objectFit="cover"
              h="400px"
              w="100%"
            />
          </Box>
          <VStack align="start" justify="center" spacing={4}>
            <Heading as="h2" size="xl">
              Nossa Missão
            </Heading>
            <Text fontSize="lg">
              Acreditamos em conectar agricultores locais diretamente aos consumidores, 
              promovendo uma alimentação mais saudável e sustentável. Nossa plataforma 
              elimina intermediários, garantindo preços justos para todos.
            </Text>
          </VStack>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12}>
          <Box textAlign="center" p={6} borderRadius="lg" borderWidth="1px">
            <Image
              src="https://images.unsplash.com/photo-1615648178124-01f7162ceac4"
              alt="Produtos orgânicos"
              borderRadius="lg"
              mb={4}
              h="200px"
              w="100%"
              objectFit="cover"
            />
            <Heading as="h3" size="md" mb={2}>
              Produtos Frescos
            </Heading>
            <Text>
              Alimentos frescos e orgânicos, direto do produtor para sua mesa.
            </Text>
          </Box>
          <Box textAlign="center" p={6} borderRadius="lg" borderWidth="1px">
            <Image
              src="https://images.unsplash.com/photo-1472653816316-3ad6f10a6592"
              alt="Agricultura sustentável"
              borderRadius="lg"
              mb={4}
              h="200px"
              w="100%"
              objectFit="cover"
            />
            <Heading as="h3" size="md" mb={2}>
              Sustentabilidade
            </Heading>
            <Text>
              Apoiamos práticas agrícolas sustentáveis e o desenvolvimento local.
            </Text>
          </Box>
          <Box textAlign="center" p={6} borderRadius="lg" borderWidth="1px">
            <Image
              src="https://images.unsplash.com/photo-1594761077961-cadd5ce417d8"
              alt="Comunidade agrícola"
              borderRadius="lg"
              mb={4}
              h="200px"
              w="100%"
              objectFit="cover"
            />
            <Heading as="h3" size="md" mb={2}>
              Comunidade
            </Heading>
            <Text>
              Fortalecemos laços entre produtores e consumidores locais.
            </Text>
          </Box>
        </SimpleGrid>

        <Box bg="gray.50" p={8} borderRadius="lg">
          <VStack spacing={4}>
            <Heading as="h2" size="xl">
              Por Que Escolher a AgroNet?
            </Heading>
            <Text fontSize="lg" textAlign="center">
              Nossa plataforma oferece uma experiência única de compra, onde você pode:
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
              <Box p={4}>
                <Text>✓ Conhecer a origem dos seus alimentos</Text>
              </Box>
              <Box p={4}>
                <Text>✓ Apoiar pequenos produtores locais</Text>
              </Box>
              <Box p={4}>
                <Text>✓ Garantir produtos mais frescos</Text>
              </Box>
              <Box p={4}>
                <Text>✓ Contribuir para a sustentabilidade</Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}