import ChatBot from 'react-simple-chatbot';

function ChatBotComponent() {
  return (
    <div>
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}, nice to meet you! Do you have any experience in hacking or penetration testing?',
            trigger: '4',
          },
          {
            id: '4',
            user: true,
            trigger: '5',
          },
          {
            id: '5',
            message: 'Great! What type of systems are you most interested in testing?',
            trigger: '6',
          },
          {
            id: '6',
            user: true,
            trigger: '7',
          },
          {
            id: '7',
            message: 'Do you have any specific goals for your testing, such as finding a particular type of vulnerability?',
            trigger: '8',
          },
          {
            id: '8',
            user: true,
            trigger: '9',
          },
          {
            id: '9',
            message: 'What tools or techniques do you typically use when testing for vulnerabilities?',
            trigger: '10',
          },
          {
            id: '10',
            user: true,
            trigger: '11',
          },
          {
            id: '11',
            message: 'Do you have any experience with bug bounty programs?',
            trigger: '12',
          },
          {
            id: '12',
            user: true,
            trigger: '13',
          },
          {
            id: '13',
            message: 'What do you think are the most important skills for a successful bug bounty hunter?',
            trigger: '14',
          },
          {
            id: '14',
            user: true,
            trigger: '15',
          },
          {
            id: '15',
            message: 'Thank you for sharing your thoughts! Is there anything else I can help you with?',
            return: true,
          },
        ]}


        floating={true}
      />
      <h1></h1>
    </div>


  );
}

export default ChatBotComponent;
