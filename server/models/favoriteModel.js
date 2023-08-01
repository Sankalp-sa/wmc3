import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    spells : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spells'
    }],
    characters : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'newCharacters'
    }],
    species : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Species'
    }],
    wand : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'wands'
    }],
});

const FavoriteModel = mongoose.model('Favorite', FavoriteSchema);

export default FavoriteModel;
