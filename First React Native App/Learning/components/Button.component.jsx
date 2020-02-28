import React from 'react';
import { Button } from 'react-native-elements';

export default ({ title, style, ...props }) => {
    return (
        <Button buttonStyle={{
            width: 120,
            height: 60,
            margin: 16,
            borderRadius: 8,
            ...style
        }} title={title} {...props} />
    )
}