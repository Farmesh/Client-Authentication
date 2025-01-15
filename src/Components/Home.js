
function Home() {
  //added comment 
  return (
    <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '10px' }}>
      <h1 className="text-center m-4 text-primary"> Hello {localStorage.user}</h1>
      
      <div className="card mt-4" style={{ borderColor: '#007bff' }}>
        <div className="card-body">
          <h5 className="card-title" style={{ color: '#007bff' }}>User Information</h5>
          <p className="card-text">
            <i className="fas fa-user" style={{ color: '#007bff' }}></i> Username: {localStorage.user}
          </p>
          <p className="card-text">
            <i className="fas fa-envelope" style={{ color: '#007bff' }}></i> Email: {localStorage.email}
          </p>

          <p className="card-text">
            <i className="fas fa-venus-mars" style={{ color: '#007bff' }}></i> Gender: {localStorage.Gender}
          </p>
          <p className="card-text">
            <i className="fas fa-phone" style={{ color: '#007bff' }}></i> PhoneNumber: {localStorage.PhoneNumber}
          </p>
         

          <p className="card-text">
            <i className="fas fa-key" style={{ color: '#007bff' }}></i> JWT Token: {localStorage.token}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h2 style={{ color: '#007bff' }}>Website Functionality</h2>
        <ul className="list-group">
          <li className="list-group-item" style={{ backgroundColor: '#e9f7ff' }}>
            <i className="fas fa-sign-in-alt" style={{ color: '#007bff' }}></i> Login
          </li>
          <li className="list-group-item" style={{ backgroundColor: '#e9f7ff' }}>
            <i className="fas fa-user-plus" style={{ color: '#007bff' }}></i> Register
          </li>
          <li className="list-group-item" style={{ backgroundColor: '#e9f7ff' }}>
            <i className="fas fa-key" style={{ color: '#007bff' }}></i> Change Password
          </li>
          <li className="list-group-item" style={{ backgroundColor: '#e9f7ff' }}>
            <i className="fas fa-user-edit" style={{ color: '#007bff' }}></i> Edit Profile
          </li>
          <li className="list-group-item" style={{ backgroundColor: '#e9f7ff' }}>
            <i className="fas fa-mobile-alt" style={{ color: '#007bff' }}></i> OTP Verification
          </li>
          <li className="list-group-item" style={{ backgroundColor: '#e9f7ff' }}>
            <i className="fas fa-shield-alt" style={{ color: '#007bff' }}></i> JWT Authentication
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;