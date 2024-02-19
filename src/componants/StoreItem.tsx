import { Button, Card } from 'react-bootstrap'
import { formatCurrency } from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext'

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart
  } = useShoppingCart()
  const quantity = getItemQuantity(id)
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="300px"
        width="300px"
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-5">{name}</span>
          <span className="fs-5 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add to Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: '0.5rem' }}
            >
              <div
                className="d-flex align-items-center justify-items-center"
                style={{ gap: '0.5rem' }}
              >
                <Button
                  style={{
                    padding: '2px 10px',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
                  onClick={() => decreaseCartQuantity(id)}
                >
                  -
                </Button>
                <div>
                  <span className="fs-4">{quantity}</span> in cart
                </div>
                <Button
                  style={{
                    padding: '2px 10px',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
                  onClick={() => increaseCartQuantity(id)}
                >
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
