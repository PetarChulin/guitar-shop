import { BsGithub, BsLinkedin } from 'react-icons/bs'
const Footer = () => {

    const year = new Date().getFullYear();

    return <footer style={{backgroundColor: 'rgb(11, 32, 39)', left: '0', borderRadius: '0px', boxShadow: '1px 2px 12px black'}}>{`Copyright © PetarChulin Code ${year}`}
    {" "}
    <a href='https://github.com/petarchulin'><BsGithub/></a>
    {" "}
    <a href='https://www.linkedin.com/in/petar-chulin-058b32228'><BsLinkedin/></a>
    </footer>;
};


export default Footer;