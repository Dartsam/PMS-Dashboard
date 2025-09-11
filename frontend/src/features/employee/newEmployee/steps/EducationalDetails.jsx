import { Box, Typography, Grid, TextField, Button, IconButton } from "@mui/material";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";

export default function EducationalDetails({
  formData,
  handleChange,
  handleAddEducation,
  handleRemoveEducation,
}) {
  const educationLevels = ["Primary", "Secondary", "Tertiary"];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Educational Details
      </Typography>

      {educationLevels.map((level) => {
        // ensure there's always at least one row to render for each level
        const entries = formData.education?.[level] ?? [{}];

        return (
          <Box key={level} mb={4}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              {level} Education
            </Typography>

            {/* Render rows for each education level */}
            {entries.map((entry, index) => (
              <Box
                key={index}
                mb={2}
                p={2}
                border="1px solid #ddd"
                borderRadius={2}
                aria-labelledby={`education-${level.toLowerCase()}-row-${index}`}
              >
                <Grid container spacing={2} alignItems="center">
                  {/* Institution Name */}
                  <Grid item xs={12} md={3}>
                    <TextField
                      id={`education-${level}-institution-${index}`}
                      name={`education.${level}[${index}].institution_name`}
                      label="Institution Name"
                      fullWidth
                      value={entry.institution_name || ""}
                      onChange={handleChange}
                      autoComplete="organization"
                    />
                  </Grid>

                  {/* From Year (YYYY) */}
                  <Grid item xs={12} md={3}>
                    <TextField
                      id={`education-${level}-from-${index}`}
                      name={`education.${level}[${index}].start_year`}
                      label="From (YYYY)"
                      type="number"
                      fullWidth
                      value={entry.start_year || ""}
                      onChange={handleChange}
                      inputProps={{ min: 1900, max: new Date().getFullYear(), step: 1 }}
                      placeholder="e.g. 2008"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  {/* To Year (YYYY) */}
                  <Grid item xs={12} md={3}>
                    <TextField
                      id={`education-${level}-to-${index}`}
                      name={`education.${level}[${index}].end_year`}
                      label="To (YYYY)"
                      type="number"
                      fullWidth
                      value={entry.end_year || ""}
                      onChange={handleChange}
                      inputProps={{ min: 1900, max: new Date().getFullYear() + 10, step: 1 }}
                      placeholder="e.g. 2014"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  {/* Qualification Obtained */}
                  <Grid item xs={12} md={3}>
                    <TextField
                      id={`education-${level}-qualification-${index}`}
                      name={`education.${level}[${index}].qualification_obtained`}
                      label="Qualification Obtained"
                      fullWidth
                      value={entry.qualification_obtained || ""}
                      onChange={handleChange}
                      autoComplete="education-degree"
                    />
                  </Grid>
                </Grid>

                {/* Delete Row (if more than 1) */}
                { (formData.education?.[level]?.length ?? entries.length) > 1 && (
                  <Box mt={1}>
                    <IconButton
                      color="error"
                      aria-label={`Remove ${level} row ${index + 1}`}
                      onClick={() => handleRemoveEducation(level, index)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                )}
              </Box>
            ))}

            {/* Add Row Button */}
            <Button
              variant="outlined"
              startIcon={<AddCircleOutline />}
              onClick={() => handleAddEducation(level)}
            >
              Add Row for {level}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}
