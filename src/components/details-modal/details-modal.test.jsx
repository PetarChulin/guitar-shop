import Swal from 'sweetalert2';
import DetailsModal from './details-modal';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('DetailsModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls Swal.fire with the correct parameters', () => {
    const title = 'Test Title';
    const imageUrl = 'test-image.jpg';
    const description = 'Test Description';
    const price = '$19.99';

    DetailsModal(title, imageUrl, description, price);

    expect(Swal.fire).toHaveBeenCalledWith({
      title: title,
      imageUrl: imageUrl,
      description: description,
      price: price,
      confirmButtonText: 'Close',
    });
  });
});
