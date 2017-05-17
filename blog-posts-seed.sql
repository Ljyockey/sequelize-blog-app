BEGIN;
  
  INSERT INTO authors (first_name, last_name, username) VALUES 
  ('Mickey', 'Mouse', 'mickeymouse'),
  ('Harry', 'Potter', 'hpotter'),
  ('Leslie', 'Knope', 'knope4pres'),
  ('Michael', 'Scott', 'michael_scarn'),
  ('Liz', 'Lemon', 'lizlemon'),
  ('Jason', 'Mraz', 'mr_a-z');
  
INSERT INTO posts (author_id, title, content) VALUES
  (1, 'Me and Walt', 'blah blah 1928 1955 blah blah'),
  (2, 'Life With the Muggles', 'blah blah Dursleys blah blah'),
  (3, 'Woman in Government', 'blah blah Pelosi, Michelle Obama, blah blah'),
  (4, 'Threat Level Midnight Script', 'exploding hockey puck blah blah blah'),
  (5, 'Underappreciated Writer', 'blah blah Tracy blah blah Jack blah blah Jenna'),
  (6, 'Going on Tour', 'blah blah tour dates blah blah');

  
INSERT INTO comments (post_id, author_id, comment_text) VALUES
  (1, 2, 'Wicked'),
  (2, 3, 'Muggles > People from Eagleton'),
  (3, 1, 'Oh boy! I mean...'),
  (4, 5, 'Uhhh...Want some pointers?'),
  (5, 6, 'Love it!'),
  (6, 4, 'Thats what she said teeheehee');

COMMIT;