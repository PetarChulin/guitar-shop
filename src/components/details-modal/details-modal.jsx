import Swal from 'sweetalert2';

import './details-modal.styles.scss';

const DetailsModal = (title, imageUrl, description, price) => {
    Swal.fire({
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price,
        confirmButtonText: 'Close',
    });

};

export default DetailsModal;