import namor from "namor";


const randomBrowser = () => {
  const browser = ['Google Chrome 74.0.3729.108', 'Firefox 74.0', 'QQBrowser 10.5.4039.400'];
  return browser[Math.floor(Math.random() * browser.length)];
};

const randomContent = () => {
  const content = ['博主，想问下你的服务商是哪个啊，网站加评论需要公安备案吗?，听说很麻烦还要公安备案我就一直没弄',
    '嗯。蛮不错的,我搞博客基本都是在看哪个的主题好看。然后安装了就算了',
    '而且最近审核告知我不能给网站加友联，所以就很纠结'
  ];
  return content[Math.floor(Math.random() * content.length)];
};

const randomSystem = () => {
  const system = ['Windows 10', 'Android 6.0.1', 'Mac OSX 10_15_3'];
  return system[Math.floor(Math.random() * system.length)];
};

const randomEmail = () => {
  return `${namor.generate({words: 1, numbers: 0})}@gmail.com`;
};

const randomTitle = () => {
  const title = ['高性能无锁队列 Disruptor', 'Spring 容器学习小抄', '雨蓑烟笠傍渔矶，应不是、封侯相'];
  return title[Math.floor(Math.random() * title.length)];

};

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  }
;
const data = [
  {
    id: 1,
    post_id: 1,
    nickname: namor.generate({words: 1, numbers: 0}),
    post_title: randomTitle(),
    content: randomContent(),
    browser: randomBrowser(),
    system: randomSystem(),
    show: false,
    email: randomEmail(),
    ip: '127.0.0.1',
    website: 'shushugo.com',
    create_date: '2019/2/10 10:10',
    subRows: range(13).map((index) => ({
      id: index,
      parent_id: '',
      comment_id: 1,
      nickname: namor.generate({words: 1, numbers: 0}),
      content: randomContent(),
      browser: randomBrowser(),
      system: randomSystem(),
      show: false,
      email: randomEmail(),
      ip: '127.0.0.1',
      website: 'shushugo.com',
      create_date: '2019/2/10 10:10',
    })),
  },
  {
    id: 2,
    post_id: 1,
    post_title: randomTitle(),
    nickname: namor.generate({words: 1, numbers: 0}),
    content: randomContent(),
    browser: randomBrowser(),
    system: randomSystem(),
    show: false,
    email: randomEmail(),
    ip: '127.0.0.1',
    subRows: [],
    website: 'shushugo.com',
    create_date: '2019/2/10 10:10',
  },
  {
    id: 3,
    post_id: 2,
    post_title: randomTitle(),
    nickname: namor.generate({words: 1, numbers: 0}),
    content: randomContent(),
    browser: randomBrowser(),
    system: randomSystem(),
    show: false,
    email: randomEmail(),
    ip: '127.0.0.1',
    subRows: [],
    website: 'shushugo.com',
    create_date: '2019/2/10 10:10',
  }
];

const getDate = new Promise(((resolve, reject) => {
  resolve({
    query: () => {
      return new Promise(((resolve1, reject1) => {
        resolve1({
          data: {
            values: data,
            total: Math.floor(Math.random() * 100)
          }
        });
      }));
    },
    delete: (...props) => {
      return new Promise(((resolve1, reject1) => {
        console.log(props);
      }));
    }
  });
}));
export default getDate;
