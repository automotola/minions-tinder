'use strict';

const React = require('react/addons');
const ImageStack = require('./components/ImageStack');
const ICON_SIZE = 4;
const minions = [
    'kevin.jpg',
    'bob.jpg',
    'stuart.jpg',
    'minion2.jpg',
    'minion3.jpg',
    'minion4.jpg',
    'minion5.jpg',
    'minion6.jpg',
    'minion8.jpg',
    'minion9.jpg',
    'minion10.jpg',
    'minion11.jpg'
].map((src, index, arr) => {
    return {
        src,
        hidden: (index > arr.length - 3) ? false : true
    };
});

const App = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getInitialState() {
        return {
            images: minions,
            xSize: ICON_SIZE,
            hSize: ICON_SIZE
        };
    },

    componentWillMount() {
        const images = minions;
        images.forEach((img) => {
            const image = new Image();
            image.src = 'images/' + img.src;
        });
    },

    _discardImage() {
        const images = this.state.images.reduce((acc, i, index, arr) => {
            if (index === arr.length - 1) {
                return acc;
            } else if (index > arr.length - 4) {
                i.hidden = false;
            }
            return acc.concat([i]);
        }, []);
        this.setState({
            images,
            xSize: ICON_SIZE,
            hSize: ICON_SIZE
        });
    },

    _favImage() {
        this._discardImage();
    },

    _setXSize(val) {
        this.setState({
            xSize: val
        });
    },

    _setHSize(val) {
        this.setState({
            hSize: val
        });
    },

    render() {
        return (
            <div className='app row'>
                <div className='small-12 columns text-center'>
                    Drag it!
                </div>
                <div className='small-12 columns'>
                    <ImageStack
                        leftHandler={this._discardImage}
                        rightHandler={this._favImage}
                        xSizeHandler={this._setXSize}
                        hSizeHandler={this._setHSize}
                        images={this.state.images} />
                </div>
                <div className='small-6 columns text-center iconcontainer'>
                    <i style={{fontSize: this.state.xSize + 'rem', marginTop: (ICON_SIZE - this.state.xSize) + 'rem'}}
                        className='buttons ion-close' onClick={this._discardImage} />
                </div>
                <div className='small-6 columns text-center iconcontainer'>
                    <i style={{fontSize: this.state.hSize + 'rem', marginTop: (ICON_SIZE - this.state.hSize) + 'rem'}}
                        className='buttons ion-heart' onClick={this._favImage} />
                </div>
            </div>
        );
    }
});

module.exports = App;

