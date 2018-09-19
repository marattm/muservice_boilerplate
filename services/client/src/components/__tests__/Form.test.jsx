import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';


import Form from '../Form'

const formData = {
    username: '',
    email: '',
    password: ''
};

const testData = [
    {
        formType: 'Register', 
        formData: {
            username: '',
            email: '',
            password: ''
        },
    },
    {
        formType: 'Login',
        formData: {
            email: '',
            password: ''
        },
    }
]

describe('When not authenticated', () => {

    testData.forEach((el) => {
        test(`${el.formType} Form renders properly`, () => {
            const component = <Form formType={el.formType} formData={el.formData} />;
            const wrapper = shallow(component);
            
            const h1 = wrapper.find('h1');
            expect(h1.length).toBe(1);
            expect(h1.get(0).props.children).toBe(el.formType);
            
            const formGroup = wrapper.find('.form-group');
            expect(formGroup.length).toBe(Object.keys(el.formData).length);
            expect(formGroup.get(0).props.children.props.name).toBe(Object.keys(el.formData)[0]);
            expect(formGroup.get(0).props.children.props.value).toBe('');
        });
        
        test(`${el.formType} Form renders a snapshot properly`, () => {
            const component = <Form formType={el.formType} formData={el.formData} />;
            const tree = renderer.create(component).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
    
    
    
    test('Register Form renders a snapshot properly', () => {
        const component = <Form formType={'Register'} formData={formData} />;
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    test('Login Form renders a snapshot properly', () => {
        const component = <Form formType={'Login'} formData={formData} />;
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });

});

describe('When authenticated', () => {
    testData.forEach((el) => {
        const component = <Form 
                            formType={el.formType}
                            formData={el.formData}
                            isAuthenticated={true}
                        />;
        it(`${el.formType} redirects properly.`, () => {
            const wrapper = shallow(component);
            expect(wrapper.find('Redirect')).toHaveLength(1);
        });
    })
});

describe('When authenticated', () => {
    const testValues = {
        formType: 'Register', formData: {
            username: '',
            email: '',
            password: ''
        },
        handleSubmitForm: jest.fn(),
        handleFormChange: jest.fn(),
        isAuthenticated: false,
    };
    const component = <Form {...testValues} />;
    it(`${testValues.formType} Form submits the form properly`, () => {

        const wrapper = shallow(component);
        const input = wrapper.find('input[type="text"]');
        expect(testValues.handleSubmitForm).toHaveBeenCalledTimes(0);
        expect(testValues.handleFormChange).toHaveBeenCalledTimes(0);
        input.simulate('change');
        expect(testValues.handleFormChange).toHaveBeenCalledTimes(1);
        wrapper.find('form').simulate('submit', testValues.formData);
        expect(testValues.handleSubmitForm).toHaveBeenCalledWith(testValues.formData); expect(testValues.handleSubmitForm).toHaveBeenCalledTimes(1);
    });

});


// it(`${testValues.formType} Form submits the form properly`, () => {

//     const wrapper = shallow(component);
//     const input = wrapper.find('input[type="text"]');
//     expect(testValues.handleUserFormSubmit).toHaveBeenCalledTimes(0);
//     expect(testValues.handleFormChange).toHaveBeenCalledTimes(0);
//     input.simulate('change');
//     expect(testValues.handleFormChange).toHaveBeenCalledTimes(1);
//     wrapper.find('form').simulate('submit', testValues.formData);
//     expect(testValues.handleUserFormSubmit).toHaveBeenCalledWith(testValues.formData); expect(testValues.handleUserFormSubmit).toHaveBeenCalledTimes(1);
// });