import { BsGithub, BsLinkedin } from 'react-icons/bs'
const Footer = () => {

    const year = new Date().getFullYear();

    return <footer>{`Copyright © PetarChulin Code ${year}`}
    {" "}
    <a href='https://github.com/petarchulin'><BsGithub/></a>
    {" "}
    <a href='https://www.linkedin.com/in/petar-chulin-058b32228'><BsLinkedin/></a>
    </footer>;
};


export default Footer;