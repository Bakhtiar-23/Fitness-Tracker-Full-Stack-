import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../../styles/TeamMembers.css'; // Assuming you have a CSS file for styling

const TeamMembers = () => {
  const navigate = useNavigate();

  const teamMembers = [
    { name: 'Anna Doe', PhotoUrl: 'https://as1.ftcdn.net/v2/jpg/08/48/88/40/1000_F_848884003_ki6yvD3ZSHAR1aWOqDCLIdnpgywhYqah.jpg', id: 1 },
    { name: 'Mari Johnson', PhotoUrl: 'https://as2.ftcdn.net/v2/jpg/08/00/57/37/1000_F_800573708_qL55Hxm3LrIm2fYsG7wHjekSAYiIJQ7I.jpg', id: 2 },
    { name: 'Johan Davis', PhotoUrl: 'https://as2.ftcdn.net/v2/jpg/06/09/82/97/1000_F_609829702_9oQiuQWKoDn6eqKGSqJFz7EJ5B6Sknvv.jpg', id: 3 },
    { name: 'Anna Doe', PhotoUrl: 'https://as1.ftcdn.net/v2/jpg/08/48/88/40/1000_F_848884003_ki6yvD3ZSHAR1aWOqDCLIdnpgywhYqah.jpg', id: 4 },
    { name: 'Mari Johnson', PhotoUrl: 'https://as2.ftcdn.net/v2/jpg/08/00/57/37/1000_F_800573708_qL55Hxm3LrIm2fYsG7wHjekSAYiIJQ7I.jpg', id: 5 },
    { name: 'Johan Davis', PhotoUrl: 'https://as2.ftcdn.net/v2/jpg/06/09/82/97/1000_F_609829702_9oQiuQWKoDn6eqKGSqJFz7EJ5B6Sknvv.jpg', id: 6 },
  ];

  const handleMemberClick = (id) => {
    navigate(`/team-member/${id}`);
  };

  return (
    <div className="contact-us-container">
      {/* Left Section */}
      <div className="left-section">
        <h1>Meet the Fitness Tracker Team</h1>
        <p>
          Welcome to our Fitness Tracker application! Our dedicated team of professional
          personal trainers is here to guide you on your fitness journey. Whether you're just 
          starting out or looking to take your training to the next level, we have the expertise 
          to help you achieve your goals. Our trainers specialize in personalized workout plans, 
          nutritional guidance, and providing the motivation you need to succeed. 
          <br /><br />
          Meet our team and find the perfect trainer for you. Each of our trainers brings 
          unique skills and experiences to the table, ensuring you get the best support possible.
          Click on a team member to learn more about their background and how they can help you 
          reach your fitness aspirations.
        </p>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {teamMembers.map((member) => (
          <button
            key={member.id}
            className="team-member-button"
            onClick={() => handleMemberClick(member.id)}
          >
            <img src={member.PhotoUrl} alt={member.name} className="member-photo" />
            <div className="member-info">
              <span>{member.name}</span>
              <span className="arrow-symbol">{'>'}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
