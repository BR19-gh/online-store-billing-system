export function fetchThemes() {
    fetch('/storeTheme/show', {
            method: 'GET',
        }).then((responseName) => {
            return responseName.json();
        })
        .then((responseJson) => {

            if (responseJson['storeTheme'] == "none/لايوجد") {} else {
                if (responseJson['storeTheme'] == 'originalTheme') {
                    let setProp = document.documentElement.style.setProperty;
                    setProp('--body', '#f0e9c9');
                    setProp('--borders', '#8f8d85');
                    setProp('--btns', '#f5ebbd');
                    setProp('--btnsHover', '#bbb496');
                    setProp('--container', '#d4cbabc0');
                    setProp('--containerHover', '#d4cbabb0');
                    setProp('--h1', '#c2bba1a0');
                    setProp('--h1OtherScreen', '#c2bba1d0');
                    setProp('--form', '#c4c1b6c0');
                    setProp('--formHover', '#c4c1b6');
                    setProp('--input', '#8f8d85');
                    setProp('--inputHover', '#aca588');
                    setProp('--inputFocus', '#b1a883');
                    setProp('--webkitScrollbarTrack', '#c4c1b6c0');
                    setProp('--webkitScrollbarThumb', '#969287');
                    setProp('--webkitScrollbarThumbHover', '#797464');
                    setProp('--infoCard', '#d4cbaba8');
                } else if (responseJson['storeTheme'] == 'blueTheme') {
                    setProp('--body', '#c9cbf0');
                    setProp('--borders', '#85868f');
                    setProp('--btns', '#bdbef5');
                    setProp('--btnsHover', '#8987ba');
                    setProp('--container', '#4169E1c0');
                    setProp('--containerHover', '#4169E1b0');
                    setProp('--h1', '#a3a1c2a0');
                    setProp('--h1OtherScreen', '#a3a1c2d0');
                    setProp('--form', '#9696c1c0');
                    setProp('--formHover', '#9696c1');
                    setProp('--input', '#85858f');
                    setProp('--inputHover', '#8889ac');
                    setProp('--inputFocus', '#8783b1');
                    setProp('--webkitScrollbarTrack', '#b6b6c4c0');
                    setProp('--webkitScrollbarThumb', '#878796');
                    setProp('--webkitScrollbarThumbHover', '#646579');
                    setProp('--infoCard', '#abaed4a8');
                } else if (responseJson['storeTheme'] == 'greenTheme') {
                    setProp('--body', '#c9f0cb');
                    setProp('--borders', '#858f86');
                    setProp('--btns', '#bdf5be');
                    setProp('--btnsHover', '#96bb9a');
                    setProp('--container', '#1e796bc0');
                    setProp('--containerHover', '#1e796bb0');
                    setProp('--h1', '#a1c2a3a0');
                    setProp('--h1OtherScreen', '#a1c2a3d0');
                    setProp('--form', '#b6c4b7c0');
                    setProp('--formHover', '#b6c4b8');
                    setProp('--input', '#858f85');
                    setProp('--inputHover', '#88ac8b');
                    setProp('--inputFocus', '#83b185');
                    setProp('--webkitScrollbarTrack', '#b6c4b8c0');
                    setProp('--webkitScrollbarThumb', '#879687');
                    setProp('--webkitScrollbarThumbHover', '#647965');
                    setProp('--infoCard', '#abd4b0a8');
                } else if (responseJson['storeTheme'] == 'redTheme') {
                    setProp('--body', '#f0c9c9');
                    setProp('--borders', '#8f8585');
                    setProp('--btns', '#f5bdbd');
                    setProp('--btnsHover', '#bb9696');
                    setProp('--container', '#ad5a54c0');
                    setProp('--containerHover', '#ad5a54b0');
                    setProp('--h1', '#c2a1a1a0');
                    setProp('--h1OtherScreen', '#c2a1a1d0');
                    setProp('--form', '#c4b6b6c0');
                    setProp('--formHover', '#c4b6b6');
                    setProp('--input', '#8f8585');
                    setProp('--inputHover', '#ac8888');
                    setProp('--inputFocus', '#b18383');
                    setProp('--webkitScrollbarTrack', '#c4b6b6c0');
                    setProp('--webkitScrollbarThumb', '#968787');
                    setProp('--webkitScrollbarThumbHover', '#796464');
                    setProp('--infoCard', '#d4ababa8');
                } else if (responseJson['storeTheme'] == 'pinkTheme') {
                    setProp('--body', '#efc9f0');
                    setProp('--borders', '#8f858f');
                    setProp('--btns', '#f3bdf5');
                    setProp('--btnsHover', '#bb96bb');
                    setProp('--container', '#ad5498c0');
                    setProp('--containerHover', '#ad5498b0');
                    setProp('--h1', '#c2a1b5d0');
                    setProp('--h1OtherScreen', '#c4b6c2c0');
                    setProp('--form', '#c4b6c4');
                    setProp('--formHover', '#c4b6c4');
                    setProp('--input', '#8f858f');
                    setProp('--inputHover', '#ac88a9');
                    setProp('--inputFocus', '#b183aa');
                    setProp('--webkitScrollbarTrack', '#c4b6c1c0');
                    setProp('--webkitScrollbarThumb', '#968795');
                    setProp('--webkitScrollbarThumbHover', '#796478');
                    setProp('--infoCard', '#d4abcaa8');
                } else {
                    setProp('--body', '#bbc0c6');
                    setProp('--borders', '#888888');
                    setProp('--btns', '#a7aaad');
                    setProp('--btnsHover', '#94979b');
                    setProp('--container', '#838690c0');
                    setProp('--containerHover', '#838690b0');
                    setProp('--h1', '#c2c2c2a0');
                    setProp('--h1OtherScreen', '#c2c2c2d0');
                    setProp('--form', '#cdcdcec0');
                    setProp('--formHover', '#cdcdce');
                    setProp('--input', '#8a8a8a');
                    setProp('--inputHover', '#a9a9a9');
                    setProp('--inputFocus', '#aeaeae');
                    setProp('--webkitScrollbarTrack', '#b6b6c4c0');
                    setProp('--webkitScrollbarThumb', '#969696');
                    setProp('--webkitScrollbarThumbHover', '#727272');
                    setProp('--infoCard', '#d1d1d1a8');
                }
            }
            console.log('current theme is ' + responseJson['storeTheme'])
        });
}