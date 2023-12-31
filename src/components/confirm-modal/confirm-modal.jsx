import Swal from 'sweetalert2';

import './confirm-modal.styles.scss'

const ConfirmModal =  (title, text, icon, timer, imageUrl) => {
    // try {
         Swal.fire({
            title: title,
            text: text,
            icon: icon,
            timer: timer,
            imageUrl: imageUrl,
            confirmButtonText: 'Close',
            // cancelButtonText: 'No',
        });

        // if (result.isConfirmed) {
        //     return true;
        // } else {
        //     return false;
        // }
    // } catch (error) {
    //     console.error('Error in ConfirmModal:', error);
    //     return false;
    // }
};

export default ConfirmModal;