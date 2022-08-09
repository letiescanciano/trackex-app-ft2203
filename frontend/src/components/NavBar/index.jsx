import styled from 'styled-components';
import { Logo } from './Logo';
import { AuthContext } from '../../contexts/Auth';
import { useContext } from 'react';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SideNavBar = styled.div`
  width: 250px;
  padding: 16px;
`;

const LogoTitle = styled.h1`
  margin-left: 8px;
  color: #ff7661;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 16px 32px;
  a {
    color: ${props => (props.isActive ? '#FF7661' : 'white')};
    font-weight: ${props => (props.isActive ? '500' : '200')};
    text-decoration: none;
  }
`;
export const NavBar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <SideNavBar>
      <LogoWrapper>
        <Logo />
        <LogoTitle>TrackEx</LogoTitle>
      </LogoWrapper>
      <nav>
        <List>
          <ListItem>
            <a href="/">Dashboard</a>
          </ListItem>
          <ListItem>
            <a href="/">Calendar</a>
          </ListItem>
          <ListItem isActive={true}>
            <a href="/">Transactions</a>
          </ListItem>
          <ListItem>
            <a href="/">Settings</a>
          </ListItem>
          <ListItem onClick={logout} cursor="pointer">
            Logout
          </ListItem>
        </List>
      </nav>
    </SideNavBar>
  );
};
