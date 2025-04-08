function StudyTab() {
  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <h2 className='text-2xl font-bold mb-4'>내 스터디</h2>
      <p className='text-gray-600 text-center'>참여 중인 스터디가 없습니다.</p>
      {/* Here you would map through the user's studies */}
    </div>
  );
}

export default StudyTab;
