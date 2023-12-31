import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import {ShoppingIcon, CartIconContainer, ItemCount} from "./cart-icon.styles"

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext)

    const toggleIscartOpen = () => setIsCartOpen(!isCartOpen)

    return (
    <CartIconContainer className="cart-icon-container" onClick={toggleIscartOpen}>
        <ShoppingIcon className="shopping-icon"/>
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
    );
};

export default CartIcon;