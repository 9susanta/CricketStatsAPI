using CricketStatsAPI.Model;
using CricketStatsAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CricketStatsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StudentController : ControllerBase
    {
        public StudentRepository _studentRepository;
        public StudentController(StudentRepository studentRepository) 
        {
            _studentRepository = studentRepository;
        }
        [HttpGet("GetStudent")]
        public async Task<IActionResult> GetStudent()
        {
            return Ok(await _studentRepository.GetAllStudents());
        }
        [HttpGet("GetStudentById")]
        public async Task<IActionResult> GetStudentById(int id)
        {
            return Ok(await _studentRepository.GetStudentById(id));
        }
        [HttpPost("PostStudent")]
        public async Task<IActionResult> PostStudent(string name, int mark)
        {
            return Ok(await _studentRepository.AddNewStudent(name,mark));
        }
        [HttpPatch("UpdateStudent")]
        public async Task<IActionResult> UpdateStudent(int id, Student student)
        {
            return Ok(await _studentRepository.UpdateStudent(id,student));
        }
        [HttpDelete("DeleteStudent")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            return Ok(await _studentRepository.DeleteStudent(id));
        }
    }
}
