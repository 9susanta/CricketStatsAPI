using CricketStatsAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace CricketStatsAPI.Repository
{
    public class StudentRepository
    {
        private readonly StatusContext _statusContext;

        public StudentRepository(StatusContext statusContext)
        {
            _statusContext = statusContext;
        }
        public async Task<bool> AddNewStudent(string name, int mark)
        {
            Student student = new Student { Name=name,Mark=mark};

            _statusContext.Add<Student>(student);
            return (await _statusContext.SaveChangesAsync())>0?true:false;
            
        }
        public async Task<List<Student>> GetAllStudents()
        {
            return await _statusContext.Students.ToListAsync();
        }
        public async Task<bool> UpdateStudent(int id,Student student)
        {
            Student studExist=await (_statusContext.Students.Where(x => x.Id == id).FirstOrDefaultAsync());
            studExist.Name= student.Name;
            studExist.Mark = student.Mark;
            return (await _statusContext.SaveChangesAsync()) > 0 ? true : false;

        }
        public async Task<bool> DeleteStudent(int id)
        {
            Student studExist = await (_statusContext.Students.Where(x => x.Id == id).FirstOrDefaultAsync());
            _statusContext.Students.Remove(studExist);
            return (await _statusContext.SaveChangesAsync()) > 0 ? true : false;

        }
    }
}
