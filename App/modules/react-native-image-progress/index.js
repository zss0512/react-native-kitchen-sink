'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} = React;

// Polyfill React.ART if needed
if(!React.ART) {
    React.ART = require('ReactNativeART');
}

var Image = require('react-native-image-progress');
var Progress = require('react-native-progress');

var IMAGES = [
    'http://www.savethecat.com/wp-content/uploads/2015/06/cats.jpg',
    'http://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
    'http://media4.popsugar-assets.com/files/2014/08/08/878/n/1922507/caef16ec354ca23b_thumb_temp_cover_file32304521407524949.xxxlarge/i/Funny-Cat-GIFs.jpg',
    'http://breadedcat.com/wp-content/uploads/2012/02/cat-breading-tutorial-004.jpg',
    'http://media1.santabanta.com/full1/Animals/Cats/cats-87a.jpg',
    'http://awesomegifs.com/wp-content/uploads/cat-smacks-at-hands.gif',
];

var INDICATORS = [null, Progress.Bar, Progress.Circle, Progress.Pie];

module.exports = React.createClass({
    getInitialState: function() {
        return this.getRandomState();
    },

    getRandomState: function() {
        return {
            imageUri: this.getRandomImage(),
            indicator: this.getRandomIndicator(),
        };
    },

    getRandomIndicator: function() {
        return INDICATORS.slice(0).sort( () => { return 0.5 - Math.random() } )[0];
    },

    getRandomImage: function() {
        var images = IMAGES.slice(0);

        //Filter out the current one since we don't want to see that one again
        if(this.state && typeof this.state.image === 'object') {
            images = images.filter((uri) => this.state.imageUri.indexOf(uri) !== 0 );
        }
        return images.sort( () => { return 0.5 - Math.random() } )[0] + '?rand=' + Date.now();
    },

    randomize: function() {
        this.setState({ clear: true });
        setTimeout(() => {
            this.setState(this.getRandomState());
            this.setState({ clear: false });
        });
    },

    render: function() {
        // React Native progress handlers are not reset when an image download is cancelled
        // so to avoid jittering we'll force RN to use a new Image element for each source
        if(this.state.clear) { return false; }

        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.randomize}>
                    <Image
                        source={{ uri: this.state.imageUri }}
                        indicator={this.state.indicator}
                        style={styles.image}
                        onLoaded={() => console.log('Image was loaded!')}
                        />
                </TouchableHighlight>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image: {
        width: 300,
        height: 200,
    }
});
