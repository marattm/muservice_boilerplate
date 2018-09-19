import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import UsersList from '../UsersList';

const users = [
    {
        'active': true,
        'admin': false,
        'email': 'marat@gmail.com',
        'id': 1,
        'username': 'maratule'
    },
    {
        'active': true,
        'active': false,
        'admin': 'maratmonne@mmonne.com',
        'id': 2,
        'username': 'maramone'
    }
];

test('UsersList renders properly', () => {
    const wrapper = shallow(<UsersList users={users} />);
    
    const element_tr = wrapper.find('tr');
    expect(element_tr.length).toBe(3);

    const element_th = wrapper.find('th');
    expect(element_th.length).toBe(5);
    expect(element_th.get(0).props.children).toBe('ID');
    expect(element_th.get(1).props.children).toBe('Username');
    expect(element_th.get(2).props.children).toBe('Email');
    expect(element_th.get(3).props.children).toBe('Admin');
    expect(element_th.get(4).props.children).toBe('Active');

    const element_td = wrapper.find('td');
    expect(element_td.length).toBe(10);
    expect(element_td.get(0).props.children).toBe(users[0].id);
    expect(element_td.get(1).props.children).toBe(users[0].username);
    expect(element_td.get(2).props.children).toBe(users[0].email); 
    expect(element_td.get(3).props.children).toBe(String(users[0].admin));
    expect(element_td.get(4).props.children).toBe(String(users[0].active));
});

test('UsersList renders a snapshot properly', () => {
    const tree = renderer.create(<UsersList users={users} />).toJSON();
    expect(tree).toMatchSnapshot();
});
