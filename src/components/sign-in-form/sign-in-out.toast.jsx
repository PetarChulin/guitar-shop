import Swal from 'sweetalert2';

const SignInOutToast = (email, text, icon, position, timer) => {

    let toastMixin = Swal.mixin({
        toast: true,
        // icon: 'success',
        // title: 'General',
        // animation: false,
        // position: 'top-right',
        // showConfirmButton: false,
        // timer: 3000,
        // didOpen: (toast) => {
        //   toast.addEventListener('mouseenter', Swal.stopTimer)
        //   toast.addEventListener('mouseleave', Swal.resumeTimer)
        // }
      });

      toastMixin.fire({
        animation: true,
        timerProgressBar: timer,
        timer: 3000,
        position: position,
        icon: icon,
        title: `${email} ${text}`
      });
}

export default SignInOutToast