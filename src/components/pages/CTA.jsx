import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className='cta'>
      <p className='cta-text'>
       Got an event idea?<br className='sm:block hidden' />
        Let’s make it happen with Festivo.
      </p>
      <Link to='/contact' className='btn-1'>
        Contact
      </Link>
    </section>
  );
};

export default CTA;
