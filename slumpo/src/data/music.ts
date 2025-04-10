// Track data structure for Major Slump's music catalog
export interface Track {
  id: string;
  title: string;
  featuring?: string;
  album?: string;
  type: 'single' | 'album_track' | 'ep_track';
  year: number;
  duration?: string;
  coverArt: string;
  links: {
    soundcloud?: string;
    spotify?: string;
    appleMusic?: string;
    audiomack?: string;
  };
}

export interface Album {
  id: string;
  title: string;
  type: 'album' | 'ep' | 'single';
  year: number;
  coverArt: string;
  tracks: Track[];
  links: {
    soundcloud?: string;
    spotify?: string;
    appleMusic?: string;
    audiomack?: string;
  };
}

// Music catalog data
export const musicCatalog: { albums: Album[] } = {
  albums: [
    {
      id: 'on-my-way-ep',
      title: 'On My Way',
      type: 'ep',
      year: 2023,
      coverArt: '/images/covers/on-my-way-ep.jpg',
      links: {
        spotify: 'https://open.spotify.com/album/0UESpECQ5dMEXLSvpUqnvV',
        appleMusic: 'https://music.apple.com/us/album/on-my-way/1800383172',
      },
      tracks: [
        {
          id: 'speed',
          title: 'SPEED',
          featuring: 'ZENITH CHAOS',
          type: 'ep_track',
          year: 2023,
          coverArt: '/images/covers/on-my-way-ep.jpg',
          links: {
            spotify: 'https://open.spotify.com/track/5c885GmSPEKufvWT2tRvbe',
            appleMusic: 'https://music.apple.com/us/album/speed-feat-zenith-chaos/1800383172?i=1800383173',
          }
        },
        {
          id: 'its-like-that-ep',
          title: 'IT\'S LIKE THAT',
          featuring: 'J3DI',
          type: 'ep_track',
          year: 2023,
          coverArt: '/images/covers/on-my-way-ep.jpg',
          links: {
            spotify: 'https://open.spotify.com/track/5IPD64KCOPQJt5G3r7I60j',
            appleMusic: 'https://music.apple.com/us/album/its-like-that-feat-j3di/1800383172?i=1800383175',
          }
        },
        {
          id: 'gone-boy-awakening',
          title: 'GONE BOY AWAKENING',
          type: 'ep_track',
          year: 2023,
          coverArt: '/images/covers/on-my-way-ep.jpg',
          links: {
            spotify: 'https://open.spotify.com/track/5ccQAfN1GJYl8oP11PEgQ6',
            appleMusic: 'https://music.apple.com/us/album/gone-boy-awakening/1800383172?i=1800383177',
          }
        },
        {
          id: 'technology',
          title: 'TECHNOLOGY',
          type: 'ep_track',
          year: 2023,
          coverArt: '/images/covers/on-my-way-ep.jpg',
          links: {
            spotify: 'https://open.spotify.com/track/2nCoR3oGjavgpVLi2H3QU0',
            appleMusic: 'https://music.apple.com/us/album/technology/1800383172?i=1800383178',
          }
        },
        {
          id: 'gatling',
          title: 'GATLING',
          featuring: 'DENIMADIC',
          type: 'ep_track',
          year: 2023,
          coverArt: '/images/covers/on-my-way-ep.jpg',
          links: {
            spotify: 'https://open.spotify.com/track/1f8OS9RVDitvwnwryvhi9L',
            appleMusic: 'https://music.apple.com/us/album/gatling-feat-denimadic/1800383172?i=1800383179',
          }
        },
        {
          id: 'long-st-hell',
          title: 'LONG ST. HELL',
          type: 'ep_track',
          year: 2023,
          coverArt: '/images/covers/on-my-way-ep.jpg',
          links: {
            spotify: 'https://open.spotify.com/track/4LRFn2BbAffIR0QgZp6Arb',
            appleMusic: 'https://music.apple.com/us/album/long-st-hell-skit/1800383172?i=1800383240',
          }
        },
        {
          id: 'fuck-with-the-gang',
          title: 'FUCK WITH THE GANG',
          featuring: 'J3DI, JOSHVDR, HAVOQU',
          type: 'ep_track',
          year: 2023,
          coverArt: '/images/covers/on-my-way-ep.jpg',
          links: {
            spotify: 'https://open.spotify.com/track/4UMpDxPZgYeieRMMOciUUA',
            appleMusic: 'https://music.apple.com/us/album/f-k-with-the-gang-feat-j3di-joshvdr-havoqu/1800383172?i=1800383242',
          }
        },
        {
          id: 'fade-2-dust',
          title: 'FADE 2 DUST',
          featuring: 'J3DI & HAVOQU',
          type: 'ep_track',
          year: 2023,
          coverArt: '/images/covers/on-my-way-ep.jpg',
          links: {
            spotify: 'https://open.spotify.com/track/3iuOKei2478S7neLIrWqf2',
            appleMusic: 'https://music.apple.com/us/album/fade-2-dust-feat-havoqu-j3di/1800383172?i=1800383244',
          }
        },
        {
          id: 'walk-like-this',
          title: 'WALK LIKE THIS/ON MY WAY',
          type: 'ep_track',
          year: 2023,
          coverArt: '/images/covers/on-my-way-ep.jpg',
          links: {
            spotify: 'https://open.spotify.com/track/4CIQG6rA5p124nbgZMZCBz',
            appleMusic: 'https://music.apple.com/us/album/walk-like-this-on-my-way/1800383172?i=1800383246',
          }
        },
      ]
    },
    {
      id: 'bad-things-dark-days',
      title: 'Bad Things Dark Days',
      type: 'ep',
      year: 2022,
      coverArt: '/images/covers/bad-things-dark-days.jpg',
      links: {
        audiomack: 'https://audiomack.com/major-slump/album/bad-things-dark-days-1',
      },
      tracks: [
        {
          id: 'all-night',
          title: 'ALL NIGHT',
          type: 'ep_track',
          year: 2022,
          coverArt: '/images/covers/bad-things-dark-days.jpg',
          links: {
            audiomack: 'https://audiomack.com/major-slump/song/wyc-master-a',
          }
        },
        {
          id: 'after-dark',
          title: 'AFTER DARK',
          type: 'ep_track',
          year: 2022,
          coverArt: '/images/covers/bad-things-dark-days.jpg',
          links: {
            audiomack: 'https://audiomack.com/major-slump/song/trap-trap-master-a',
          }
        },
        {
          id: 'chuck-norris',
          title: 'CHUCK NORRIS (IN MY ZONE)',
          type: 'ep_track',
          year: 2022,
          coverArt: '/images/covers/bad-things-dark-days.jpg',
          links: {
            audiomack: 'https://audiomack.com/major-slump/song/in-my-zone-master-a',
          }
        },
        {
          id: 'hxllucinate',
          title: 'HXLLUCINATE/DO IT FOR THE WEST',
          type: 'ep_track',
          year: 2022,
          coverArt: '/images/covers/bad-things-dark-days.jpg',
          links: {
            audiomack: 'https://audiomack.com/major-slump/song/hxllucinatedo-it-for-the-west',
          }
        },
        {
          id: 'wastd',
          title: 'WA$TD',
          type: 'ep_track',
          year: 2022,
          coverArt: '/images/covers/bad-things-dark-days.jpg',
          links: {
            audiomack: 'https://audiomack.com/major-slump/song/watd',
          }
        },
      ]
    },
    // Singles
    {
      id: 'late-nights',
      title: 'Late Nights',
      type: 'single',
      year: 2024,
      coverArt: '/images/covers/late-nights.jpg',
      links: {
        soundcloud: 'https://soundcloud.com/majorslvmp/lates-nights',
        spotify: 'https://open.spotify.com/album/2s54ePot4Js1vMco73dZz0',
        appleMusic: 'https://music.apple.com/us/album/late-nights/1777303036?i=1777303250',
      },
      tracks: [
        {
          id: 'late-nights-track',
          title: 'Late Nights',
          type: 'single',
          year: 2024,
          coverArt: '/images/covers/late-nights.jpg',
          links: {
            soundcloud: 'https://soundcloud.com/majorslvmp/lates-nights',
            spotify: 'https://open.spotify.com/album/2s54ePot4Js1vMco73dZz0',
            appleMusic: 'https://music.apple.com/us/album/late-nights/1777303036?i=1777303250',
          }
        }
      ]
    },
    {
      id: 'where-he-at',
      title: 'Where He At',
      type: 'single',
      year: 2024,
      coverArt: '/images/covers/where-he-at.jpg',
      links: {
        soundcloud: 'https://soundcloud.com/majorslvmp/where-he-at',
        spotify: 'https://open.spotify.com/album/3nH0H21Xt9OYI1hx2fuvKO',
        appleMusic: 'https://music.apple.com/us/album/where-he-at/1769563349?i=1769563350',
      },
      tracks: [
        {
          id: 'where-he-at-track',
          title: 'Where He At',
          type: 'single',
          year: 2024,
          coverArt: '/images/covers/where-he-at.jpg',
          links: {
            soundcloud: 'https://soundcloud.com/majorslvmp/where-he-at',
            spotify: 'https://open.spotify.com/album/3nH0H21Xt9OYI1hx2fuvKO',
            appleMusic: 'https://music.apple.com/us/album/where-he-at/1769563349?i=1769563350',
          }
        }
      ]
    },
    {
      id: 'fahrenheit',
      title: 'Fahrenheit',
      type: 'single',
      year: 2022,
      coverArt: '/images/covers/fahrenheit.jpg',
      links: {
        soundcloud: 'https://soundcloud.com/user-706881815/fahrenheit',
        appleMusic: 'https://music.apple.com/us/album/fahrenheit/1646030151?i=1646030152',
      },
      tracks: [
        {
          id: 'fahrenheit-track',
          title: 'Fahrenheit',
          type: 'single',
          year: 2022,
          coverArt: '/images/covers/fahrenheit.jpg',
          links: {
            soundcloud: 'https://soundcloud.com/user-706881815/fahrenheit',
            appleMusic: 'https://music.apple.com/us/album/fahrenheit/1646030151?i=1646030152',
          }
        }
      ]
    },
    {
      id: 'back-again',
      title: 'Back Again',
      featuring: 'H4T3L',
      type: 'single',
      year: 2021,
      coverArt: '/images/covers/back-again.jpg',
      links: {
        soundcloud: 'https://soundcloud.com/majorslvmp/back-again-ft-h4t3l',
        appleMusic: 'https://music.apple.com/us/album/back-again-feat-h4t3l/1582732888?i=1582732889',
      },
      tracks: [
        {
          id: 'back-again-track',
          title: 'Back Again',
          featuring: 'H4T3L',
          type: 'single',
          year: 2021,
          coverArt: '/images/covers/back-again.jpg',
          links: {
            soundcloud: 'https://soundcloud.com/majorslvmp/back-again-ft-h4t3l',
            appleMusic: 'https://music.apple.com/us/album/back-again-feat-h4t3l/1582732888?i=1582732889',
          }
        }
      ]
    },
    {
      id: 'smoke',
      title: 'Smoke',
      featuring: 'Ethan Eagers',
      type: 'single',
      year: 2022,
      coverArt: '/images/covers/smoke.jpg',
      links: {
        soundcloud: 'https://soundcloud.com/majorslvmp/smoke-ft-ethan-eagers-prod-major-slvmp-pinky-pointy',
      },
      tracks: [
        {
          id: 'smoke-track',
          title: 'Smoke',
          featuring: 'Ethan Eagers',
          type: 'single',
          year: 2022,
          coverArt: '/images/covers/smoke.jpg',
          links: {
            soundcloud: 'https://soundcloud.com/majorslvmp/smoke-ft-ethan-eagers-prod-major-slvmp-pinky-pointy',
          }
        }
      ]
    },
    {
      id: 'the-motel',
      title: 'The Motel / On My Mind',
      type: 'single',
      year: 2023,
      coverArt: '/images/covers/the-motel.jpg',
      links: {
        spotify: 'https://open.spotify.com/album/17a1FJbaqNCke1aHJwcuK4',
        appleMusic: 'https://music.apple.com/us/album/the-motel-on-my-mind/1705728154?i=1705728155',
      },
      tracks: [
        {
          id: 'the-motel-track',
          title: 'The Motel / On My Mind',
          type: 'single',
          year: 2023,
          coverArt: '/images/covers/the-motel.jpg',
          links: {
            spotify: 'https://open.spotify.com/album/17a1FJbaqNCke1aHJwcuK4',
            appleMusic: 'https://music.apple.com/us/album/the-motel-on-my-mind/1705728154?i=1705728155',
          }
        }
      ]
    },
    {
      id: 'its-like-that-single',
      title: 'It\'s Like That',
      featuring: 'J3DI',
      type: 'single',
      year: 2024,
      coverArt: '/images/covers/its-like-that.jpg',
      links: {
        spotify: 'https://open.spotify.com/album/1uvJ9fZziv6UWu17XZRVti',
        appleMusic: 'https://music.apple.com/us/album/its-like-that-feat-j3d/1775075115?i=1775075116',
      },
      tracks: [
        {
          id: 'its-like-that-single-track',
          title: 'It\'s Like That',
          featuring: 'J3DI',
          type: 'single',
          year: 2024,
          coverArt: '/images/covers/its-like-that.jpg',
          links: {
            spotify: 'https://open.spotify.com/album/1uvJ9fZziv6UWu17XZRVti',
            appleMusic: 'https://music.apple.com/us/album/its-like-that-feat-j3d/1775075115?i=1775075116',
          }
        }
      ]
    }
  ]
};

// Platform profile links
export const platformProfiles = {
  soundcloud: 'https://soundcloud.com/majorslvmp',
  spotify: 'https://open.spotify.com/artist/1f3JQLxENjy8l5eXeZVVD4',
  appleMusic: 'https://music.apple.com/us/artist/major-slump/1582725692',
  audiomack: 'https://audiomack.com/major-slump'
};