export default theme => ({
    root: {
        display: 'flex',
    },
    logo: {
      marginRight: '15px',
        marginTop: '10px',
        marginBottom: '10px'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#3aafdb'
    },
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
});