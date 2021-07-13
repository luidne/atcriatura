import React, { useState } from 'react';
import { Image } from "react-native";

const ImageCustom = (props) => {

    const [visible, setVisible] = useState({is: false});

        return <Image 
                    source={props.source}
                    style={{...props.style,...{height: visible.is ? 200 : 1}}}
                    resizeMode="contain"
                    onLoad={() => {
                        setVisible({is: true});
                        console.log(`onLoad image successfully`);
                    }}
        />;

}

export default ImageCustom;