import useState from 'react';

// export const useInputValue = (initialValue = '') => {
//     const [inputValue, setInputValue] = useState(initialValue);

//     return ({
//         inputValue,
//         changeInputValue: val => setInputValue(val)
//     });
// };

export function useInputValue(x) {
    const [inputValue, setInputValue] = useState(x);
    setInputValue(3);
    return inputValue;
};