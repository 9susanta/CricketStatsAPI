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
        public async Task<int> AddNewStudent(string name, int mark)
        {
            Student student = new Student { Name=name,Mark=mark};
            _statusContext.Students.Add(student);
            await _statusContext.SaveChangesAsync();
            return student.Id;
            
        }
        public async Task<List<Student>> GetAllStudents()
        {
            return await _statusContext.Students.ToListAsync();
        }
        public async Task<bool> UpdateStudent(int id,Student student)
        {
            Student studExist=await GetStudentById(id);
            studExist.Name= student.Name;
            studExist.Mark = student.Mark;
            return (await _statusContext.SaveChangesAsync()) > 0 ? true : false;

        }
        public async Task<bool> DeleteStudent(int id)
        {
            Student studExist = await GetStudentById(id);
            _statusContext.Students.Remove(studExist);
            return (await _statusContext.SaveChangesAsync()) > 0 ? true : false;

        }
        public async Task<Student> GetStudentById(int id)
        {
            return await _statusContext.Students.Where(x => x.Id == id).FirstOrDefaultAsync()??new Student();
        }
    }
}
