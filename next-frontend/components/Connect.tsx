import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';

const Connect = () => (
  <div>
    <Row className='my-5 d-flex justify-content-center'>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Connect Wallet</Card.Title>
          <Card.Text>
            Click the button below to connect your wallet and start interacting with the DeFi application.
          </Card.Text>
          <Button variant="primary">Connect Wallet</Button>
        </Card.Body>
      </Card>
    </Row>
  </div>
);

export default Connect;
