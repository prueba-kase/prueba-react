import PropTypes from 'prop-types';

const LoginContainer = ({ children }) => {
  return (
        <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 flex flex-col">
                <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-28 lg:px-32">
                    {children}
                </div>
            </div>

            <div className="w-1/2 shadow-2xl">
                <img className="object-cover w-full h-screen hidden md:block" 
                    src="https://contactcenterhub.es/wp-content/uploads/2020/05/KONECTA-MEMORIA-16-145.jpg"/>
            </div>
        </div>
  );
};

LoginContainer.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default LoginContainer;
