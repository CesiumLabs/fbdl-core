# FBDL Core
Simple package to download facebook videos.

# Example
## Download video

```js
const fbdl = require("fbdl-core");
const fs = require("fs");

fbdl.download("https://www.facebook.com/alanwalkermusic/videos/277641643524720")
    .then(res => {
        res.pipe(fs.createWriteStream("./aw.mp4"));
    });

```

## Get info

```js
const fbdl = require("fbdl-core");
const url = "https://www.facebook.com/alanwalkermusic/videos/277641643524720";

fbdl.getInfo(url)
    .then(console.log);

```

## Example Response

```js
{
  name: 'EXCLUSIVE WORLD PREMIERE | Facebook',
  title: 'EXCLUSIVE WORLD PREMIERE',
  description: 'EXCLUSIVE WORLD PREMIERE: A 5-minute exclusive preview of the wonderful Alan Walker his Mainstage set at Tomorrowland Around the World. This weekend, we...',
  rawVideo: 'https://video.fktm3-1.fna.fbcdn.net/v/t42.9040-2/10000000_616030639328161_2327537459957197156_n.mp4?_nc_cat=107&_nc_sid=985c63&efg=eyJybHIiOjY0MCwicmxhIjoxNzg5LCJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_ohc=gaLKQ6r-ZQwAX-Pb90s&rl=640&vabr=356&_nc_ht=video.fktm3-1.fna&oh=61954364472bf4fedbdfc93ccb760cbd&oe=5F3D03E8',
  thumbnail: 'https://scontent.fktm3-1.fna.fbcdn.net/v/t15.5256-10/115759345_915519478950181_6760759259159138332_n.jpg?_nc_cat=104&_nc_sid=08861d&_nc_ohc=2w-5CyeMtLMAX8Lq408&_nc_ht=scontent.fktm3-1.fna&oh=4f4c5d0a7f61c88b7cb2facb232240a3&oe=5F61AAA2',
  uploadedAt: 2020-07-23T09:00:46.000Z,
  duration: '4:29',
  interactionCount: 1286285,
  streamURL: 'https://video.fktm3-1.fna.fbcdn.net/v/t42.9040-2/10000000_616030639328161_2327537459957197156_n.mp4?_nc_cat=107&_nc_sid=985c63&efg=eyJybHIiOjY0MCwicmxhIjoxNzg5LCJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_ohc=gaLKQ6r-ZQwAX-Pb90s&rl=640&vabr=356&_nc_ht=video.fktm3-1.fna&oh=61954364472bf4fedbdfc93ccb760cbd&oe=5F3D03E8',
  publishedAt: 2020-07-23T09:00:46.000Z,
  width: 1920,
  height: 1080,
  nsfw: false,
  genre: 'Music & Audio',
  keywords: [
    'Music & Audio',
    'Travel & Leisure Activities',
    'Electronic & Dance Music',
    'Musical Performances',
    'Vacation & Leisure Activities',
    'Music Festivals',
    'Western Europe Travel & Tourism',
    'Alan Walker',
    'Alan Walker'
  ],
  comments: 2218,
  size: '344894.063kB',
  quality: '1080p',
  author: {
    type: 'Organization',
    name: 'Alan Walker',
    url: 'https://www.facebook.com/alanwalkermusic/'
  },
  publisher: {
    type: 'Organization',
    name: 'Alan Walker',
    url: 'https://www.facebook.com/alanwalkermusic/',
    avatar: 'https://scontent.fktm3-1.fna.fbcdn.net/v/t1.0-1/p200x200/48169789_2176143715783042_6840597526190489600_o.jpg?_nc_cat=1&_nc_sid=dbb9e7&_nc_ohc=h0SOqmqZdv8AX_CKGY3&_nc_ht=scontent.fktm3-1.fna&_nc_tp=6&oh=392b31442d234b3af4d0a8e7695c30e9&oe=5F645F2A'
  },
  url: 'https://www.facebook.com/alanwalkermusic/videos/277641643524720',
  reactions: {
    total: 64563,
    like: 33181,
    love: 28632,
    care: 1929,
    wow: 674,
    haha: 76,
    sad: 56,
    angry: 15
  },
  shares: '10944',
  views: '1286285'
}

```

# Join my discord
**[https://discord.gg/2SUybzb](https://discord.gg/2SUybzb)**