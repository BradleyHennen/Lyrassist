const initalData = {
    tasks: {
        'task-1': {id: 'task-1', header: 'Verse', content: 'Somebody once told me the world is gonna roll me I ain\'t the sharpest tool in the shed She was looking kind of dumb with her finger and her thumb In the shape of an "L" on her forehead'},
        'task-2': {id: 'task-2', header: 'Pre-Chorus', content: 'Well, the years start coming and they don\'t stop coming Fed to the rules and I hit the ground running Didn\'t make sense not to live for fun Your brain gets smart but your head gets dumb So much to do, so much to see So what\'s wrong with taking the backstreets? You\'ll never know if you don\'t go You\'ll never shine if you don\'t glow'},
        'task-3': {id: 'task-3', header: 'Chorus', content: 'Hey now, you\'re an all star Get your game on, go play Hey now, you\'re a rock star Get the show on, get paid And all that glitters is gold Only shooting stars break the mold'},
        'task-4': {id: 'task-4', header: 'Verse', content: 'It\'s a cool place, and they say it gets colder You\'re bundled up now, wait \'til you get older But the meteor men beg to differ Judging by the hole in the satellite picture The ice we skate is getting pretty thin The water\'s getting warm so you might as well swim My world\'s on fire, how \'bout yours? That\'s the way I like it and I\'ll never get bored'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'All Star by Smash Mouth',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
    },
    // Facilitate reordering ot the columns when there are more than one
    columnOrder: ['column-1'],
}

export default initalData;