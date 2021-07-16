import Post from './models/post';

export default function createFakeData() {

    const posts = [...Array(40).keys()].map(i => ({
        title:`포스트 #${i}`,
        body:'Today, all content, no matter which output medium is planned, predicted, or not predicted, can be produced with technologies that allow downstream transformations into any presentation desired, although such best-practice preparation is still far from universal. This usually involves a markup language (such as XML, HTML, or SGML) that tags the content semantically and machine-readably, which allows downstream technologies (such as XSLT, XSL, or CSS) to output them into whatever presentation is desired. This concept is known as the separation of presentation and content. This paradigm is now the conventional one in most commercial publishing, except to the extent that legacy and backward compatibility issues and budget constraints interfere, and to the extent that many of the people involved dont understand the topic enough to help build compliance. But the need to manually paginate has diminished as the technology for dynamic display and automatic pagination advances. Also, there is less need to make a hierarchical distinction between pagination in print and pagination in electronic display, because the same underlying content will most likely be used for the latter exclusively if not for both display methods.',
        tags:['fake','data'],
    }));
    Post.insertMany(posts,(err,docs)=>{
        console.log(docs)
    });
}
