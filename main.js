
main();

// TODO: replace with actual S3 bucket URL and prefix
const bucketUrl = "https://your-bucket.s3.amazonaws.com";
const prefix = "path/";

function main() {
    // TODO delete when fetchFromS3 is implemented.
    const images = [
        "https://picsum.photos/id/1015/600/400",
        "https://picsum.photos/id/1025/600/400",
        "https://picsum.photos/id/1035/600/400",
        "https://picsum.photos/id/1045/600/400"
    ];
    
    // Fetchs single random object from S3 bucket.
    // TODO uncomment when S3 service is set up.
    // const data = fetchFromS3();

    // Temp value for testing, delete when S3 implemented.
    // TODO delete when fetchFromS3 is implemented.
    const data = {
        objectURL: images[Math.floor(Math.random() * images.length)],
        title: "Random Image",
        description: "This is a random image from Picsum.",
        source: "https://picsum.photos/",
        email: "user@example.com"
    };

    // Select the element by its ID and update based on data from S3.
    document.getElementById("mainImage").src = data.objectURL;
    document.getElementById("title").textContent = data.title;
    document.getElementById("description").textContent = data.description;
    document.getElementById("source").textContent = data.source;
    document.getElementById("email").textContent = data.email;
}

// TODO: Needs to be tested when S3 service is set up.
async function fetchFromS3() {
    // Get list of objects in XML format
    const itemList = await fetch(`${bucketUrl}?list-type=2&prefix=${encodeURIComponent(prefix)}`);

    // TODO: delete after testing.
    if (!itemList.ok) {
        throw new Error("Failed to list bucket contents");
    }

    const xmlText = await itemList.text();

    // Get Keys from XML response
    const keys = [...xmlText.matchAll(/<Key>(.*?)<\/Key>/g)].map(m => m[1]);

    // Randomly choose one key
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    const objectUrl = `${bucketUrl}/${randomKey}`;

    // Fetch object
    const object = await fetch(objectUrl);

    // TODO: delete after testing.
    if (!object.ok) {
        throw new Error("Failed to fetch object");
    }

    // Extract metadata
    const title = object.headers.get("x-amz-meta-title");
    const source = object.headers.get("x-amz-meta-source");
    const email = object.headers.get("x-amz-meta-email");
    const description = object.headers.get("x-amz-meta-description");

    // TODO: update after testing.  Not really sure I need key, image, or content type.
    return {
        key: randomKey,
        objectURL,
        image: new Uint8Array(arrayBuffer),
        title,
        source,
        email,
        description,
        contentType: object.headers.get("content-type")
    };

}