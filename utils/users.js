const users=[];
function userjoin(id,username,room)
{
	const user={id,username,room};
	users.push(user);
	return user;
}
function currentuser(id)
{
	return users.find(user=>user.id===id);
}
function userleave(id)
{
	const index=users.findIndex(user=>user.id===id);
	if(index!=-1)
	{
		return users.splice(index,1)[0];
	}
}
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports=({
	userjoin,
	currentuser,
	userleave,
	getRoomUsers
});