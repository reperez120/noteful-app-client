export default class Folder extends React.Component {
    static defaultProps ={
      onDeleteFolder: () => {},
    }
    static contextType = ApiContext;
  
    handleClickDelete = e => {
      e.preventDefault()
      const FolderId = this.props.id
  
      fetch(`${config.API_ENDPOINT}/api/folders/${folderId}`, {
        method: 'DELETE'
      })
        .then(res => {
          console.log(res)
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res
        })
        .then(() => {
          this.context.deleteFolder(folderId)
        })
        .catch(error => {
          console.error({ error })
        })
    }
  
    render() {
      const { name, id, content, modified } = this.props
      console.log(this.props)
      return (
        <div className='Folder'>
          <h2 className='fo__title'>
            <Link to={`/note/${id}`}>
              {name}
            </Link>
          </h2>
          <button
            className='Note__delete'
            type='button'
            onClick={this.handleClickDelete}
          >
            {' '}
            remove
          </button>
             {/* <Link to=
             {`/edit/:noteId`}>
               Edit Note
             </Link> */}
         </div>

        </div>
        
      )
    }
  }