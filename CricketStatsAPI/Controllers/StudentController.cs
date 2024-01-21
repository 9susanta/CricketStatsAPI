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
        [HttpPost]
        public async Task<IActionResult> PostStudent(string name, int mark)
        {
            return Ok(await _studentRepository.AddNewStudent(name,mark));
        }
        [HttpPatch]
        public async Task<IActionResult> UpdateStudent(int id, Student student)
        {
            return Ok(await _studentRepository.UpdateStudent(id,student));
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            return Ok(await _studentRepository.DeleteStudent(id));
        }
    }
}
