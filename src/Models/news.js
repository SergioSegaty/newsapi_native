export default class News {
    constructor(article) {
        this.author = article.author;
        this.name = article.source.name;
        this.title = article.title;
        this.description = article.description;
        this.url = article.url;
        this.imageUrl = article.urlToImage;
        this.publishedAt = this.cleanDate(article.publishedAt);
        this.content = article.content;
        this.favorited = false;

        this.validation()
    }

    validation = () => {
        if (this.imageUrl == null)
            this.imageUrl = 'https://via.placeholder.com/300';

        if (!this.name)
            this.name = this.title;

        if (!this.title)
            this.title = this.name;
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Takes the Date and Parses it to a more readable string.
     * @param {string} date
     */
    cleanDate = date => {
        let key = "-";
        let fixedDate = date
            .replace("Z", "")
            .replace(/[/-]/g, char => key[char] || "/")
            .split("T")
            .join(" - ");
        return fixedDate;
    };
}