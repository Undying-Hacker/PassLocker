import React, { useState, useEffect } from 'react';
import { Dimensions, View, Animated } from 'react-native';
import { Overlay } from 'react-native-elements';

export default ({ children, visible, containerStyle }) => {
    const [startAnime] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(
            startAnime, {
            duration: 1000,
            toValue: 1
        }
        ).start()
    }, []);
    const { width, height } = Dimensions.get('window');
    return (
            <Overlay
                isVisible={visible}
                animationType='fade'
                windowBackgroundColor="rgba(0, 0, 0, .5)"
                borderRadius={8}
                width={width - 50}
                height={height / 3}
                padding={0}
            >
                <Animated.View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', ...containerStyle
                }}>
                    {children}
                </Animated.View>
            </Overlay>
    )
}