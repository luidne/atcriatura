import React, { useState } from 'react';
import { Image } from "react-native";

const ImageCustom = (props) => {

    const [visible, setVisible] = useState({is: false});

        return <Image 
                    source={props.source}
                    style={{...props.style,...{
                        width: visible.is ? props.style.width : 1,
                        height: visible.is ? props.style.height : 1
                    }}}
                    resizeMode="cover"
                    onLoad={() => {
                        setVisible({is: true});
                        // console.log(`onLoad image successfully`);
                    }}
        />;

}

export default ImageCustom;