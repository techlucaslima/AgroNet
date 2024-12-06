export const getCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

export const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateCartItemQuantity = (cartItems, productId, change) => {
  const updatedCart = cartItems.map((item) => {
    if (item.id === productId) {
      const newQuantity = item.quantity + change;
      return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
    }
    return item;
  }).filter(Boolean);
  
  saveCartToStorage(updatedCart);
  return updatedCart;
};

export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
};