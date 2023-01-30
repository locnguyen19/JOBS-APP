import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';

import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg'
import React from 'react';

const Landing = () => {
 
  return (
    <React.Fragment>
      
      <Wrapper>
        <nav>
        <img src={logo} alt='jobify' className='logo' />
        </nav>
        <div className='container page'>
          {/* info */}
          <div className='info'>
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              We are here to help you to get the job you want.
              Track your job applications and keep your job search organized, all in one place.

            </p>
            <Link to='/register' className='btn btn-hero'>
              Login/Register
            </Link>
          </div>
          <img src="https://guildsolutionsinc.com.au/images/librariesprovider9/blog-assets/job-portals.tmb-postful.jpg?sfvrsn=8d92730b_2" alt='job hunt' className='img main-img' />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default Landing;
