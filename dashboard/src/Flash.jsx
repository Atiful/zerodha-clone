

function Flash({message , success}){
    return (
        <div className="alert alert-warning alert-dismissible fade show flash" role="alert">
         {message && <p>{message}</p>}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
    )
}
export default Flash;